/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type TenantApplicationUpdateFormInputValues = {
    adults?: string;
    leaseTerm?: string;
    household?: string;
    rentalHistory?: string;
    employmentHistory?: string;
    uploadedFiles?: string[];
};
export declare type TenantApplicationUpdateFormValidationValues = {
    adults?: ValidationFunction<string>;
    leaseTerm?: ValidationFunction<string>;
    household?: ValidationFunction<string>;
    rentalHistory?: ValidationFunction<string>;
    employmentHistory?: ValidationFunction<string>;
    uploadedFiles?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TenantApplicationUpdateFormOverridesProps = {
    TenantApplicationUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    adults?: PrimitiveOverrideProps<TextAreaFieldProps>;
    leaseTerm?: PrimitiveOverrideProps<TextFieldProps>;
    household?: PrimitiveOverrideProps<TextAreaFieldProps>;
    rentalHistory?: PrimitiveOverrideProps<TextAreaFieldProps>;
    employmentHistory?: PrimitiveOverrideProps<TextAreaFieldProps>;
    uploadedFiles?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TenantApplicationUpdateFormProps = React.PropsWithChildren<{
    overrides?: TenantApplicationUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    tenantApplication?: any;
    onSubmit?: (fields: TenantApplicationUpdateFormInputValues) => TenantApplicationUpdateFormInputValues;
    onSuccess?: (fields: TenantApplicationUpdateFormInputValues) => void;
    onError?: (fields: TenantApplicationUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TenantApplicationUpdateFormInputValues) => TenantApplicationUpdateFormInputValues;
    onValidate?: TenantApplicationUpdateFormValidationValues;
} & React.CSSProperties>;
export default function TenantApplicationUpdateForm(props: TenantApplicationUpdateFormProps): React.ReactElement;
