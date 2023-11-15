import { z } from "zod";
import { version } from "../../../package.json";

export const appVersion = version;

export const envVariables = z.object({
  BASE_API_URL: z.string().default(""),
  ENVIRONMENT: z.string().default("development"),
  MODE: z.string().default("development"),
});

export type ProcessEnv = z.infer<typeof envVariables>;
export const processEnv = envVariables.parse(import.meta.env);

export enum EnvEnum {
  DEV = "development",
  PRO = "production",
  TEST = "test",
}

export const isEnvDev = () => processEnv.MODE === EnvEnum.DEV;
export const isEnvPro = () =>
  processEnv.ENVIRONMENT === EnvEnum.PRO && processEnv.MODE === EnvEnum.PRO;
export const isEnvTest = () =>
  processEnv.ENVIRONMENT === EnvEnum.TEST && processEnv.MODE === EnvEnum.PRO;

export const generateNameWithEnv = (name: string) => {
  let prefix = "";

  if (isEnvDev()) {
    prefix = "DEV_.";
  } else if (isEnvTest()) {
    prefix = "TEST_.";
  }
  return prefix + name;
};
