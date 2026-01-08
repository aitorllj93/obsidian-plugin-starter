import { App, BasesPropertyId, BasesQueryResult, BasesViewConfig, Keymap, parsePropertyId } from "obsidian";
import React, { useRef } from "react";

export const MY_BASES_VIEW_TYPE_ID = 'my-bases-view';

type Props = {
	app: App;
	config: BasesViewConfig;
	containerEl: HTMLElement;
	data: BasesQueryResult;
}

const MyBasesView = (props: Props) => {
	const { app, config, containerEl, data } = props;
    const order = config.getOrder() as BasesPropertyId[];
    const propertySeparator = String(config.get('separator') ?? ' - ');

	return (
		<div className="my-obsidian-plugin">
			{data.groupedData.map((group) => {
		return <div key={`${group.key}`} className="mb-4">
			{group.key && <span className="font-bold text-lg">{String(group.key)}</span>}
			<ul className="space-y-2">
				{
					group.entries.map(entry => (
						<li key={`${entry.file.path}-${group.key}`} className="list-disc list-inside">
							{order.map((propertyName, index) => {
								const linkEl = useRef<HTMLAnchorElement>(null);
                                const { type, name } = parsePropertyId(propertyName);
                                const value = entry.getValue(propertyName);
								const isFilename = name === 'name' && type === 'file';
								const onFilenameClick = (event) => {
									const evt = event.nativeEvent;
									if (evt.button !== 0 && evt.button !== 1) return;
									evt.preventDefault();
									const path = entry.file.path;
									const modEvent = Keymap.isModEvent(evt);
									void app.workspace.openLinkText(path, '', modEvent);
								};
								const onFileNameMouseOver = (evt) => {
									app.workspace.trigger('hover-link', {
									  event: evt.nativeEvent,
									  source: 'bases',
									  hoverParent: containerEl,
									  targetEl: linkEl.current,
									  linktext: entry.file.path,
									});
								}
								// if (value.isEmpty()) return null;

								return (
									<React.Fragment key={`${entry.file.path}-${group.key}-${index}`}>
									{index > 0 && <span className="text-muted-foreground">{propertySeparator}</span>}
									{isFilename && (<a ref={linkEl} onMouseOver={onFileNameMouseOver} onClick={onFilenameClick} className="text-primary hover:underline">{String(entry.file.name)}</a>)}
									{!isFilename && (<span className="text-muted-foreground">{value.toString()}</span>)}
									</React.Fragment>
								);
							})}
						</li>
					))
				}
			</ul>
		</div>
	})}
		</div>
	)
};

export default MyBasesView;
