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

<form enctype='multipart/form-data' method='POST' action={action}>
    {#each elems as elem}
        <span>{elem.label}</span> <input type={elem.type} name={elem.name}>
    {/each}
</form>