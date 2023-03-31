<script lang="ts">
    export let detailImage;
    export let detailText;
    export let detailUnit;
</script>

<div style="display: flex; justify-content: start;">
    <div style="display: flex; align-self: center;">
        <img
            src={detailImage}
            alt="weather detail icon"
            class="filter-green"
            style="height: 50px; width: 50px;"
        />
    </div>
    <div style="display: flex; align-self: center;">
        <div>{detailText}</div>
        <div class="text-secondary" style="margin-left: 0.5rem;">
            {detailUnit}
        </div>
    </div>
</div>
