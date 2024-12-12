import React, {
    ChangeEvent,
    createContext,
    ReactNode,
    useContext,
    useState,
  } from "react";
  
  type NormalValue = string | number | boolean;
  
  // フォームの値と型定義
  export type FormValues<T = Record<string, unknown>> = T & {
    [K in keyof T]: NormalValue;
  };
  
  // フォームエラーの型定義
  export type FormErrors<T = Record<string, unknown>> = {
    [K in keyof FormValues<T>]?: {
      type: string;
      message: string;
    };
  };
  
  // フォームコンテキストの型定義
  interface FormContextType<T = Record<string, unknown>> {
    values: FormValues<T>;
    errors: FormErrors<T>;
    handleFieldChange: (
      name: string | number | symbol,
      value: NormalValue
    ) => void;
  }
  
  // フォームプロパティの型定義
  interface CustomFormProps<T = Record<string, unknown>> {
    initialValues?: FormValues<T>;
    onFinish: (values: FormValues<T>) => void;
    onFinishFailed?: (errors: FormErrors<T>) => void;
    children: ReactNode;
  }
  
  // バリデーションルールの型定義
  interface ValidationRules {
    required?: boolean;
    pattern?: RegExp;
    maxLength?: number;
    minLength?: number;
    message?: string;
    validator?: (value: NormalValue, values: FormValues) => Promise<void>;
  }
  
  // フォームアイテムプロパティの型定義
  interface FormItemProps<T> {
    name: keyof T;
    label: string;
    rules?: ValidationRules[];
    children: ReactNode;
  }
  
  // フォームコンテキストの作成
  const FormContext = createContext<FormContextType<unknown> | undefined>(
    undefined
  );
  
  // フォームコンテキストを使用するためのカスタムフック
  const useFormContext = <T,>() => {
    const context = useContext(FormContext) as FormContextType<T>;
    if (!context) {
      throw new Error("Form components must be used within a CustomForm");
    }
    return context;
  };
  
  // メインのフォームコンポーネント
  export const CustomForm = <T,>({
    initialValues = {} as FormValues<T>,
    onFinish,
    onFinishFailed,
    children,
  }: CustomFormProps<T>) => {
    const [values, setValues] = useState<FormValues<T>>(initialValues);
    const [errors, setErrors] = useState<FormErrors<T>>({});
  
    // フィールド値の変更を処理
    const handleFieldChange = (
      name: string | number | symbol,
      value: NormalValue
    ) => {
      setValues((prev) => ({
        ...prev,
        [name]: value,
      }));
      // 入力時にエラーをクリア
      if (errors[name as keyof T]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name as keyof T];
          return newErrors;
        });
      }
    };
  
    // バリデーション処理
    const validateField = async (
      name: string,
      value: NormalValue,
      rules: ValidationRules[] = []
    ) => {
      const fieldErrors: FormErrors<T> = {};
      for (const rule of rules) {
        if (rule.required && !value) {
          fieldErrors[name as keyof T] = {
            type: "required",
            message: `rule.message || ${String(name)}は必須項目です`,
          };
          return fieldErrors;
        }
        if (rule.pattern && !rule.pattern.test(String(value))) {
          fieldErrors[name as keyof T] = {
            type: "pattern",
            message: `rule.message || ${String(name)}の形式が正しくありません`,
          };
          return fieldErrors;
        }
        if (rule.maxLength && String(value).length > rule.maxLength) {
          fieldErrors[name as keyof T] = {
            type: "maxLength",
            message:
              rule.message ||
              `${String(name)}は${rule.maxLength}文字以下で入力してください`,
          };
          return fieldErrors;
        }
        if (rule.minLength && String(value).length < rule.minLength) {
          fieldErrors[name as keyof T] = {
            type: "minLength",
            message:
              rule.message ||
              `${String(name)}は${rule.minLength}文字以上で入力してください`,
          };
          return fieldErrors;
        }
        if (rule.validator) {
          try {
            await rule.validator(value, values);
          } catch (err: unknown) {
            if (err instanceof Error) {
              fieldErrors[name as keyof T] = {
                type: "custom",
                message: err.message || "カスタムバリデーションエラー",
              };
            } else {
              // the situationerr is not type of Error
              fieldErrors[name as keyof T] = {
                type: "custom",
                message: "カスタムバリデーションエラー",
              };
            }
  
            return fieldErrors;
          }
        }
      }
      return fieldErrors;
    };
  
    // フォームの送信処理
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      const newErrors: FormErrors<T> = {};
      let hasError = false;
  
      // フォームの検証
      for (const child of React.Children.toArray(children)) {
        if (React.isValidElement(child) && child.type === FormItem) {
          const { name, rules } = child.props as FormItemProps<T>;
          const fieldName = name as keyof T;
          const fieldValue = values[fieldName];
  
          // 各フィールドのバリデーションを実行
          const fieldErrors = await validateField(
            String(name),
            fieldValue,
            rules
          );
          if (Object.keys(fieldErrors).length > 0) {
            newErrors[fieldName] = fieldErrors[fieldName];
            hasError = true;
          }
        }
      }
  
      if (hasError) {
        setErrors(newErrors);
        onFinishFailed?.(newErrors);
      } else {
        onFinish(values);
      }
    };
  
    return (
      <FormContext.Provider value={{ values, errors, handleFieldChange }}>
        <form onSubmit={handleSubmit}>{children}</form>
      </FormContext.Provider>
    );
  };
  
  // フォームアイテムコンポーネント
  export const FormItem = <T,>({
    name,
    label,
    rules = [],
    children,
  }: FormItemProps<T>) => {
    const { values, errors, handleFieldChange } = useFormContext<T>();
    const [localError, setLocalError] = useState<string | null>(null);
  
    // 即时验证逻辑
    const validateOnChange = async (value: NormalValue) => {
      if (rules.length === 0) return;
  
      for (const rule of rules) {
        if (rule.required && !value) {
          setLocalError(rule.message || `${String(name)}は必須項目です`);
          return;
        }
        if (rule.pattern && !rule.pattern.test(String(value))) {
          setLocalError(
            rule.message || `${String(name)}の形式が正しくありません`
          );
          return;
        }
        if (rule.maxLength && String(value).length > rule.maxLength) {
          setLocalError(
            rule.message ||
              `${String(name)}は${rule.maxLength}文字以下で入力してください`
          );
          return;
        }
        if (rule.minLength && String(value).length < rule.minLength) {
          setLocalError(
            rule.message ||
              `${String(name)}は${rule.minLength}文字以上で入力してください`
          );
          return;
        }
        if (rule.validator) {
          try {
            await rule.validator(value, values);
          } catch (err: unknown) {
            setLocalError(
              err instanceof Error ? err.message : "カスタムバリデーションエラー"
            );
            return;
          }
        }
      }
  
      // 全部通过则清空错误
      setLocalError(null);
    };
  
    // 子要素中注入属性并监听 onChange
    const childrenWithProps = React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        const mergedProps = {
          ...child.props,
          name: String(name),
          value: values[name] || "",
          onChange: async (
            e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
          ) => {
            const newValue = e.target.value;
            handleFieldChange(name, newValue);
            await validateOnChange(newValue);
          },
        };
  
        return React.cloneElement(child, mergedProps);
      }
      return child;
    });
  
    return (
      <div>
        <label htmlFor={String(name)}>{label}</label>
        {childrenWithProps}
        {(errors[name] || localError) && (
          <span style={{ color: "red" }}>
            {localError || errors[name]?.message}
          </span>
        )}
      </div>
    );
  };
  
  export default CustomForm; 