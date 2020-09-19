<template>
    <div class="comment-component">
        <div class="card text-dark">
            <div class="card-body">
                <p>{{commentProp.creator.name}}</p>
                <p>{{commentProp.body}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "comment-component",
        props: ["commentProp"],
    };
</script>