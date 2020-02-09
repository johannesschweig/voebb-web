<template>
    <a
    :href='"https://voebb.de/aDISWeb/app?service=direct/0/Home/$DirectLink&sp=SPROD00&sp=S" + identifier'
    target='_blank'
    >
        <LinkIcon />
    </a>
</template>

<script>
import LinkIcon from '../../assets/link.svg'

export default {
  components: {
    LinkIcon
  },
  props: {
    identifier: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
svg * {
    stroke: var(--color-3);
}

svg:hover *,
svg:focus *,
svg:active * {
    stroke: var(--color-4);
}
</style>
