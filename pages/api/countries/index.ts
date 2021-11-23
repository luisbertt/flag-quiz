import { NextApiRequest, NextApiResponse } from "next"

import countries from "data/countries.json"

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
	try {
		if (!Array.isArray(countries)) {
			throw new Error("Cannot find country data")
		}

		res.status(200).json(countries)
	} catch (err) {
		res.status(500).json({ statusCode: 500, message: err.message })
	}
}

export default handler
