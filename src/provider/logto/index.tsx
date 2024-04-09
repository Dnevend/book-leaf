import { LogtoProvider, LogtoConfig } from "@logto/react";

const config: LogtoConfig = {
  endpoint: import.meta.env.VITE_LOGTO_ENDPOINT, // E.g. http://localhost:3001
  appId: import.meta.env.VITE_LOGTO_APPID,
};

export const LogtoProviderWrap = (props: React.PropsWithChildren) => (
  <LogtoProvider config={config}>{props.children}</LogtoProvider>
);

export default LogtoProviderWrap;
