<template>
        <b-button :disabled="disabled" :variant="variant">
            <loader v-if="loading" />
            <span v-else>{{ label }}</span>
        </b-button>
</template>
<script>
export default {
    props: {
        disabled: {
            type: Boolean,
            required: false,
            default: false
        },
        label: {
            type: String,
            required: true
        },
        loading: {
            type: Boolean,
            required: false,
            default: false
        },
        variant: {
            type: String,
            default: 'primary'
        }
    }
}
</script>