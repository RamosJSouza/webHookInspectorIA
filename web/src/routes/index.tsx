import { createFileRoute } from '@tanstack/react-router'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import { Sidebar } from '../components/sidebar'
import { WebhookDetailHeader } from '../components/webhook-detail-header'
import { SectionTile } from '../components/section-title'
import { SectionDataTable } from '../components/section-data-table'
import { CodeBlock } from '../components/ui/code-block'

export const Route = createFileRoute('/')({
    component: Index,
})

function Index() {
    const overviewData = {
        key: 'Method',
        value: 'POST',
        statusCode: 200,
        contentType: 'application/json',
        contentLength: 100,
        path: '/video/upload/status',
        ip: '127.0.0.1',
        timestamp: '1 minute ago',
    }

    return (
        <div className="h-screen bg-zinc-900">
            <PanelGroup direction="horizontal">
                <Panel defaultSize={20} minSize={15} maxSize={40} >
                    <Sidebar />
                </Panel>

                <PanelResizeHandle className="w-px bg-zinc-700 hover:bg-zinc-600 transition-colors duration-150" />

                <Panel defaultSize={80} minSize={60} >
                    <div className="h-full flex flex-col">
                        <WebhookDetailHeader />
                        <div className="flex-1 overflow-y-auto">
                            <div className="space-y-6 p-6">
                                <div className="space-y-4">
                                    <SectionTile>Request Overview</SectionTile>
                                    <SectionDataTable data={Object.entries(overviewData).map(([key, value]) => ({ key, value: String(value) }))} />
                                </div>

                                <div className="space-y-4">
                                    <SectionTile>Query Parameters</SectionTile>
                                    <SectionDataTable data={Object.entries(overviewData).map(([key, value]) => ({ key, value: String(value) }))} />
                                </div>

                                <div className="space-y-4">
                                    <SectionTile>Headers</SectionTile>
                                    <SectionDataTable data={Object.entries(overviewData).map(([key, value]) => ({ key, value: String(value) }))} />
                                </div>

                                <div className="space-y-4">
                                    <SectionTile>Request Body</SectionTile>
                                    <CodeBlock code={JSON.stringify(overviewData, null, 2)} language="json" />
                                </div>
                            </div>
                        </div>
                    </div>
                </Panel>

            </PanelGroup>
        </div>
    )
}
