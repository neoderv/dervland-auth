<script>
    import Form from '$lib/Form.svelte';

    /** @type {import('./$types').ActionData} */
    export let form;
</script>

<p>Already have an account? <a href='/login'>Login </a> to use the service.</p>
<Form action='/register' elems={[
    {'label': 'Username', 'type': 'text', 'name': 'user'},
    {'label': 'Password', 'type': 'password', 'name': 'pass'},
    {'label': 'Confirm Password', 'type': 'password', 'name': 'pass2'}
]}/>
<p>{form ? form.message : ''}</p>