import Timeline from '../../components/timeline/timeline.vue'
import TimelineItem from '../../components/timeline/timelineItem.vue'
import TimelineTitle from '../../components/timeline/timelineTitle.vue'

export {
  Timeline,
  TimelineItem,
  TimelineTitle
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component(Timeline.name, Timeline)
  window.Vue.component(TimelineItem.name, TimelineItem)
  window.Vue.component(TimelineTitle.name, TimelineTitle)
}
