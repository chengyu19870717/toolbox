import { defineAsyncComponent, defineComponent, h } from 'vue'
import type { ToolboxAPI } from '@toolbox/frontend-sdk'
import FlowParserView from './FlowParserView.vue'

export function createView(api: ToolboxAPI, toolId: string) {
  return defineComponent({
    render() {
      return h(FlowParserView, { api, toolId })
    }
  })
}
