<template>
    <div class="bossWorking_container">
        开工实施
    </div>
</template>

<script>
    import { getEstate } from '@/server';
    import { Cell, CellGroup, Button, Field, Toast, Popup, Picker } from 'vant';
    import { postAddCustomer } from '@/server';

    export default {
        name: 'bossWorking',
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
    .bossWorking_container {
        
    }
</style>
