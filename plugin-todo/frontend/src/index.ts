import { defineComponent, h } from 'vue'
import type { ToolboxAPI } from '@toolbox/frontend-sdk'
import TodoView from './TodoView.vue'

export function createView(api: ToolboxAPI, toolId: string) {
  return defineComponent({
    render() {
      return h(TodoView, { api, toolId })
    }
  })
}
