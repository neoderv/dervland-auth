<script>
    import Form from '$lib/Form.svelte';
    import { onMount } from "svelte";

    /** @type {import('./$types').ActionData} */
    export let form;

    let search = "";

    onMount(() => {
        search = new URL(document.location).search;

    });
</script>

<p>Already have an account? <a href='/login{search}'>Login </a> to use the service.</p>
<Form elems={[
    {'label': 'Username', 'type': 'text', 'name': 'user'},
    {'label': 'Password', 'type': 'password', 'name': 'pass'},
    {'label': 'Confirm Password', 'type': 'password', 'name': 'pass2'}
]}/>
<p>{form ? form.message : ''}</p>