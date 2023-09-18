<script>
    export let action = undefined;
    export let elems = [];

    $: {
        elems.push({
            'label': 'Submit',
            'type': 'Submit',
            'name': 'submit'
        });
    }
</script>

<style>
    form {
        display: grid;
        grid-template-columns: 0.7fr 1fr;

        width: 500px;

        box-shadow: var(--shadow-1);

        padding: 10px;
        margin-top: 10px;
    }
</style>

<form enctype='multipart/form-data' method='POST' action={action}>
    {#each elems as elem}
        <span>{elem.label}</span> <input type={elem.type} name={elem.name}>
    {/each}
</form>