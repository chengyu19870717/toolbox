import { defineComponent, h } from 'vue'
import type { ToolboxAPI } from '@toolbox/frontend-sdk'
import DataModelView from './DataModelView.vue'

export function createView(api: ToolboxAPI, toolId: string) {
  return defineComponent({
    render() {
      return h(DataModelView, { api, toolId })
    }
  })
}
