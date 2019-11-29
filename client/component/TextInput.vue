<template>
    <span>
        <input 
            :type="type" 
            :value="value"
            :placeholder="placeholder"
            :name="name"
            :readonly="readonly"
            @input="$emit('input', $event.target.value)"
            @focus="$emit('focus')"
            @blur="$emit('blue')"
            @change="$emit('input', $event.target.value)"
            class="form-control"
            minlength="1" >
        <span v-if="error" style="color:#ff7979">{{error}}</span>
    </span>
</template>
<script>
export default {
    props: {
        placeholder: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: false,
            default: 'text'
        },
        value: {
            type: String,
            required: false,
            default: ''
        },
        name: {
            type: String,
            required: true
        },
        error: {
            type: String,
            required: false
        },
        readonly: {
            type: String,
            required: false
        }
    }
}
</script>