<script>
    import Form from "$lib/Form.svelte";
    import { onMount } from "svelte";

    let next = false;
    let loc = "/";
    let search = "";

    /** @type {import('./$types').ActionData} */
    export let form;

    onMount(() => {
        loc = document.location;
        next = new URL(loc).searchParams.get("next");
        search = new URL(loc).search;

        let nextUrl = next || "/";

        if (form && form.success == "next")
            window.location.href = nextUrl + `?data=${form.data}`;
    });
</script>

<p>
    No account? <a href="/register{search}">Register </a> an account to use the service.
</p>
<h1>Notice</h1>
<p>
    You are giving authentication permissions to <b>{next || "nobody"}</b>. Only
    do this if you trust the site, else your account could get compromised by an
    unknown third party.
</p>
<Form
    action={loc}
    elems={[
        { label: "Username", type: "text", name: "user" },
        { label: "Password", type: "password", name: "pass" },
    ]}
/>
<p>{form ? form.message : ""}</p>
