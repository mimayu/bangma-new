<template>
    <div class="bossFinish_container">
        完工
    </div>
</template>

<script>
    import { getEstate } from '@/server';
    import { Cell, CellGroup, Button, Field, Toast, Popup, Picker } from 'vant';
    import { postAddCustomer } from '@/server';

    export default {
        name: 'bossFinish',
        components: {
            Cell,
            CellGroup,
            Button,
            Field,
            Toast,
            Popup, 
            Picker
        },
        data() {
            return {
                
            };
        },
        created() {
            
        },
        methods: {

        }
    }
</script>

<style lang="scss">
    .bossFinish_container {
        
    }
</style>
