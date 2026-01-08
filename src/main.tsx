import { BasesView, Plugin, QueryController } from "obsidian";

import React from "react";
import { createRoot, Root } from "react-dom/client";

import { defaultSettings, TSettings } from "@/settings";
import { MyObsidianPluginSettingsTab } from "@/settings-tab";
import { loadData } from "@/utils/codeblock";

import MyCodeBlock from "@/components/MyCodeBlock";
import MyBasesView, { MY_BASES_VIEW_TYPE_ID } from "@/components/MyBasesView";

export default class MyObsidianPlugin extends Plugin {
	settings: TSettings;

	async onload(): Promise<void> {
		await this.loadSettings();

		this.addSettingTab(new MyObsidianPluginSettingsTab(this.app, this));

		this.registerMarkdownCodeBlockProcessor(
			"my-obsidian-plugin",
			(s, e, i) => {
				let data = loadData(s);
				e.empty();
				const root = createRoot(e);
				root.render(
					<React.StrictMode>
						<MyCodeBlock
							data={data}
							getSectionInfo={() => i.getSectionInfo(e)}
							settings={this.settings}
							app={this.app}
						/>
					</React.StrictMode>
				);
			}
		);

		this.registerBasesView(MY_BASES_VIEW_TYPE_ID, {
			name: "My Bases View",
			icon: 'lucide-graduation-cap',
			factory: (controller, containerEl) => {
				const MyBasesViewClass = class extends BasesView {
					readonly type = MY_BASES_VIEW_TYPE_ID;
					private containerEl: HTMLElement;
					private root: Root;

					constructor(controller: QueryController, parentEl: HTMLElement) {
						super(controller);
						this.containerEl = parentEl.createDiv(`bases-${this.type}-view-container`);
					}

					public onDataUpdated(): void {
						this.root?.unmount();
						this.containerEl.empty();
						this.root = createRoot(this.containerEl);

						this.root.render(
							<React.StrictMode>
								<MyBasesView app={this.app} containerEl={this.containerEl} config={this.config} data={this.data} />
							</React.StrictMode>
						);
					}
				}

				return new MyBasesViewClass(controller, containerEl);
			},
			options: () => ([
			  {
				// The type of option. 'text' is a text input.
				type: 'text',
				// The name displayed in the settings menu.
				displayName: 'Property separator',
				// The value saved to the view settings.
				key: 'separator',
				// The default value for this option.
				default: ' - ',
			  },
		  ])
		});

		this.addCommand({
			id: `insert`,
			name: `Insert My Plugin`,
			editorCallback: (e, _) => {
				e.replaceSelection("```my-obsidian-plugin\n```\n");
			},
		});
	}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			defaultSettings,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
