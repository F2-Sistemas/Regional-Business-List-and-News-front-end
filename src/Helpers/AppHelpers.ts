import { useMemo } from "preact/hooks";
import config from "../resources/config"
export function getConfig(configKey: string, defaultValue: any = null): any {

    const configData: object | null = useMemo(
        () => config(),
        ['configData']
    );

    if (!configKey || !(configKey in configData)) {
        return defaultValue || null;
    }

    let memoizedConfig = useMemo(
        () => {
            try {
                let data: Array<any> | any | null = (
                    Object.entries(configData)
                ).find((item) => item[0] == configKey)

                return data[1] ?? defaultValue ?? null
            } catch (error) {
                return defaultValue || null;
            }
        },
        [configKey]
    );

    return memoizedConfig ?? defaultValue ?? null
}
