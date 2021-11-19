import { useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { loggedInChanged } from "../state/UserState";

export default function usePrivilegedQuery(query, options) {
    const shouldUpdate = useReactiveVar(loggedInChanged);
    const { data, error, refetch } = useQuery(query, options);
    useEffect(async () => {
        if (shouldUpdate) {
            loggedInChanged(false);
            await refetch();
        }
    }, [shouldUpdate]);
    return { data, error, refetch };
}
