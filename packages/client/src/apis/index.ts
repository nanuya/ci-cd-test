import { isFunction, isObject } from "../utils/typeGuard";
import todos from "./todos";

const { REACT_APP_API_BASE_URL } = process.env

const getRequestWithBody = (request: Request) => {
    try {
        if (!request?.body) {
            return request;
        }
    
        return {
            ...request,
            headers: {
                ...request?.headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request.body)
        }
    } catch(e) {
        console.error(e);
    }
}

const handleResponse = async (response: Response) => {

    if (!response?.ok) {
        console.error('http status failed');
        return;
    }

    if (response?.status === 204) {
        return;
    }

    const data = await response.json();

    return data;
}

const callApi = async (request: Request) => {
    const apiUrl = `${REACT_APP_API_BASE_URL}${request.url}`;
    
    try {
        const _req = getRequestWithBody(request);

        if (!_req) {
            console.error('plz check the request');
            return;
        }

         
        const response = await fetch(apiUrl, _req);

         
        
        return handleResponse(response);
    } catch(e) {
        console.error('promise rejected : ', e);
    }

}

const option = {
    todos
}

const handler: ProxyHandler<any> = {
    get(target, prop, receiver) {
        const targetValue = Reflect.get(target, prop, receiver);
        
        if (isFunction(targetValue)) {
            return async (...args: any) => callApi(targetValue(...args));
        }

        if (isObject(targetValue)) {
            return new Proxy(targetValue, handler);
        }

        return targetValue;
    }
};

const proxyOption = new Proxy(option, handler);

export default proxyOption;