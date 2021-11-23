import React, { ReactNode } from "react"
import Head from "next/head"

type Props = {
	children?: ReactNode
	title?: string
}

const Layout = ({ children, title = "This is the default title" }: Props) => (
	<div>
		<Head>
			<title>{title}</title>
			<meta charSet="utf-8" />
			<meta
				name="viewport"
				content="initial-scale=1.0, width=device-width"
			/>
			<link
				rel="icon"
				href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌎</text></svg>"
			/>
		</Head>
		{children}
		<footer className="text-center">
			<hr />
			<span className="font-mono text-sm">
				developed by{" "}
				<a
					href="https:github.com/luisbertt"
					className="underline"
					target="_blank"
				>
					luisbertt
				</a>
			</span>
		</footer>
	</div>
)

export default Layout
