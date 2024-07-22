import { Text } from "~/components/ui";
import { $loader } from "./loader";
import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";

export const loader = $loader

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
