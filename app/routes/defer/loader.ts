import { defer, LoaderFunctionArgs } from "@remix-run/cloudflare";

export async function $loader({ request, context: { env } }: LoaderFunctionArgs) {
    const delay = 3
    return defer({
        delay,
        hello: new Promise<string>((resolve) => {
            setTimeout(() => {
                resolve("Hello, World!")
            }, delay * 1000)
        }).catch((e) => { throw new Response("Oops", { status: 500 }) })
    })
}
