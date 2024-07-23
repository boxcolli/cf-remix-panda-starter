import { Text } from "~/components/ui";
import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import { defer, LoaderFunctionArgs } from "@remix-run/cloudflare";

export async function loader({ request, context: { env } }: LoaderFunctionArgs) {
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


export default function Index() {
    const { delay, hello } = useLoaderData<typeof loader>()

    return (
        <>
            <Text size="2xl">Defer</Text>
            <Suspense fallback={<Text>Will be delayed {delay} seconds...</Text>}>
                <Await resolve={hello}>
                    {(hello) => <Text>{hello}</Text>}
                </Await>
            </Suspense>
        </>
    )
}
