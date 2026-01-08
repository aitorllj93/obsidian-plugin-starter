import React from "react";

const App = (props: any) => {
	const { data, getSectionInfo, settings, app } = props;

	return (
		<div className="my-obsidian-plugin" id="my-obsidian-plugin">
			<div className="flex flex-col items-center justify-center h-screen">
				<h1 className="text-6xl font-bold">Hello World</h1>
			</div>
		</div>
	);
};

export default App;
