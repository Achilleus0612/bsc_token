// declare module '*.svg' {
// 	import * as React from 'react';
  
// 	export const ReactComponent: React.FunctionComponent<React.SVGProps<
// 	  SVGSVGElement
// 	> & { title?: string }>;
  
// 	const src: string;
// 	export default src;
// }

declare module '*.png'
declare module '*.jpg'
declare module '*.svg'
declare module '*.scss'
declare module '*.webp'

declare interface Window {
	ethereum: 			any
}

declare interface ComponentProps {
	children?: React.ReactNode
}

declare interface TeamItemType {
	src: string
	name: string
	designation: string
	socials?: {
		[key: string]: string
	}
}

declare interface TabContentType {
	className: string
	id: string
	link?: string
	title: string
	description?: string
	ariaLabel?: string
	target?: string
	ariaControls?: string
	ariaSelected?: boolean
}

declare interface RoadmapItemType {
	title: string
	roadmapTitle: string
	info: JSX.Element|Array<string | JSX.Element>
}

declare interface FaqItemType {
	id: string
	controls: string
	expanded: boolean
	btnClass: string
	contentClass: string
	title: string
	details: string
}

declare interface BlogItemType {
	title: string
	url: string
	time: string
	src: string
}

declare interface RendererType {
	days: number
	hours: number
	minutes: number
	seconds: number
	completed: boolean
}