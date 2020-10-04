<script>
    let modals = [];

    export const addModal = (modal) => {
        modals = [...modals, modal];
    }

    export const removeModal = (modal) => {
        modals = modals.filter(m => m !== modal);
    }
</script>

<div class={`modal-layer ${modals.length === 0 ? '' : 'active'}`}>
    <div class="modals">
    </div>
</div>

<style type="text/scss">
    .modal-layer {
        pointer-events: none;
        z-index: 999;
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;

        background: #000;
        opacity: 0;
        transition: 0.5s;

        &.active {
            opacity: 0.7;
        }

        .modals {
            height: 100%;
            width: 100%;
        }
    }
</style>