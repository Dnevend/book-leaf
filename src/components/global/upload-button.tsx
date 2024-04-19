import { PropsWithChildren, createRef } from "react";
import { Button, ButtonProps, Input } from "../ui";
import { CloudUpload } from "lucide-react";

export const UploadButton = (
  props: PropsWithChildren<
    {
      onUpload: (files: FileList | null) => void;
      accept?: string;
    } & ButtonProps
  >
) => {
  const { children, onUpload, accept, ...originButtonProps } = props;

  const uploadRef = createRef<HTMLInputElement>();

  const onClick = () => {
    uploadRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onUpload(event.target.files);
  };

  return (
    <>
      <Button onClick={onClick} {...originButtonProps}>
        {children ? children : <CloudUpload />}
      </Button>
      <Input
        type="file"
        ref={uploadRef}
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />
    </>
  );
};
