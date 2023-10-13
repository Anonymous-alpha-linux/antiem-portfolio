type CustomReactQuillProps = {
    value?: string;
    onChange: (htmlText: string) => void;
};

declare const CustomReactQuill: React.ComponentClass<CustomReactQuillProps>;

export default CustomReactQuill;
