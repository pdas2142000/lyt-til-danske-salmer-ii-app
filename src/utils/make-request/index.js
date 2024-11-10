
/**Local Imports */
import { Api } from "../../services/api"

export const makeRequest = async (
    method,
    url,
    queryParams = {},
    authToken,
    bodyRequest = null,
    isFormData = false,
    tags = null,
) => {

    const requestOptions = {
        ...(tags && tags?.length ? { next: { tags: tags } } : {}),
        method: method,
        headers: {
            ...(!bodyRequest || isFormData ? {} : { 'Content-Type': 'application/json' }),
            ...(authToken ? { 'Authorization': `Bearer ${authToken}` } : {}),
            'Accept-Language': 'da',
        },
        ...(bodyRequest && method.toLowerCase() !== "GET" ? { body: isFormData ? bodyRequest : JSON.stringify(bodyRequest) } : {})
    }
    const headpoint = Api.baseurl(url, queryParams)

    try {

        const Response = await fetch(headpoint, requestOptions)

        if (!Response.ok) {
            console.log('error', await Response.json())
            throw new Error(`Request failed with status ${Response.status}`)
        }
        const ResponseData = await Response.json()
        return ResponseData
    } catch (error) {
        console.error(error)
    }
}


/**
 * Funciton to revalidate server side component. Call router.refresh to update the pages
 * @param {Array<string> | string} path 
 */
export const revalidate = async (path) => {

    const requestOptions = {
        method: "GET",
    }
    if (typeof path === "string") {
        const headpoint = Api.baseurl('api/revalidate', { page: path })
        await fetch(headpoint, requestOptions)
    }
    else {
        for (let singlePath of path) {
            const headpoint = Api.baseurl('api/revalidate', { page: singlePath })
            await fetch(headpoint, requestOptions)
        }
    }
}