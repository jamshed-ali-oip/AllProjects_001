import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// ** Config
import { base_URL } from "./config";
const instance = axios.create({
    baseURL: base_URL,
    timeout: 500000,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

// Add a request interceptor
instance.interceptors.request.use(async (config) => {
    const storedToken = await AsyncStorage.getItem("Token");
    console.log('====================================');
    console.log(storedToken, "storedToken");
    console.log('====================================');
    return {
        ...config,
        headers: {
            // authorization: "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJvaXAuY29tLnBrIiwiYXVkIjoib2lwLmNvbS5wayIsInN1YiI6ImEwNmYxNDg1LWNlMzItNDNhZS1iMGFhLTk1NjI5ZGY1YWM2ZCIsImlhdCI6MTY3ODI3NDAxNSwiZXhwIjoxNjgwODY2MDE1LCJwcm0iOiI0YjRjNThmYzc4ODA1MWY5NTVmNDM1ZjFjOThkN2Y1ZTUxODk3YjlkNDFlNDk2ZTFhNTAzMzBjN2U0ZTk4NWViNTYyZDE0ZDcwMzVmMzNhNTUwZDgzNDFhYzc0MmYzNzc4ZGU1MjBmZjI3ZDQzMTU0NmQ2YTQxNmEzOWI2MWFlZSJ9.MfaOmwg-_skUq-byQoDsWE5mTt_iJo5tq-GQ2sJNk1D53hXOlEH3fplNZKxgYQcxBg1WVqNcPXPif9iqn7VYKg"
            authorization: `Bearer ${storedToken}`,
        },
    };
});

export default instance;