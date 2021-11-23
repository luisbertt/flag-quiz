import countriesData from "data/countries.json"
import { Country } from "interfaces"
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import Layout from "components/Layout"

const IndexPage = () => {
	const [query, setQuery] = useState<string>("")
	const [countries, setCountries] = useState<Country[]>(
		countriesData.map(country => ({ ...country, guessed: false }))
	)
	const [countriesLeft, setcountriesLeft] = useState<Country[]>(countriesData)
	const [currentIndex, setCurrentIndex] = useState<number>(0)
	const [currentCountry, setCurrentCountry] = useState<Country>(
		countries[currentIndex]
	)

	const inputRef = useRef(null)

	useEffect(() => {
		if (query.toLowerCase() === currentCountry.name.toLowerCase()) {
			setQuery("")

			if (currentIndex === countriesLeft.length - 1)
				setCurrentIndex(index => index - 1)

			setCountries(countries =>
				countries.map(country =>
					country.name === currentCountry.name
						? { ...country, guessed: true }
						: country
				)
			)
			setcountriesLeft(countries =>
				countries.filter(
					country => country.name !== currentCountry.name
				)
			)
		}
	}, [query])

	useEffect(() => {
		setCurrentCountry(countriesLeft[currentIndex])
	}, [currentIndex])

	useEffect(() => {
		setCurrentCountry(countriesLeft[currentIndex])
	}, [countriesLeft])

	const onPrevPressed = () =>
		setCurrentIndex(
			index => (index - 1 + countriesLeft.length) % countriesLeft.length
		)

	const onNextPressed = () =>
		setCurrentIndex(index => (index + 1) % countriesLeft.length)

	const onFlagClicked = (country: Country) => {
		if (!country.guessed) {
			setCurrentCountry(country)
			inputRef.current.focus()
		}
	}

	return (
		<Layout title="Flag Quiz">
			<header className="flex w-3/5 mx-auto space-x-4 items-center justify-between">
				<div className="flex space-x-10">
					<CurrentCountryFlag country={currentCountry} />

					<div className="text-sm w-60">
						<p>Enter Country:</p>
						<input
							type="text"
							className="border px-2 py-1 w-full"
							onChange={e => setQuery(e.target.value)}
							value={query}
							ref={inputRef}
						/>

						<div className="flex justify-between text-blue-500 underline">
							<button onClick={onPrevPressed}>Prev</button>
							<button onClick={onNextPressed}>Next</button>
						</div>
					</div>
				</div>

				<div className="flex space-x-10">
					<Stats countries={countries} />
					<Timer />
				</div>
			</header>

			<main className="flex flex-wrap justify-center">
				{countries.map(country => (
					<Flag
						country={country}
						onClick={onFlagClicked}
						key={country.name}
					/>
				))}
			</main>
		</Layout>
	)
}

type FlagProps = {
	country: Country
	onClick: Dispatch<SetStateAction<Country>>
}

const Flag = ({ country, onClick }: FlagProps) => {
	const { name, guessed, flag } = country
	const opacity = guessed ? "opacity-100" : "opacity-40"
	const hidden = guessed ? "" : "hidden"
	return (
		<button
			className="w-16 flex flex-col items-center cursor-pointer"
			onClick={() => onClick(country)}
		>
			<span className={`text-6xl ${opacity}`}>{flag}</span>
			<p className={`text-xs ${hidden}`}>{name}</p>
		</button>
	)
}

const CurrentCountryFlag = ({ country }: { country: Country }) => (
	<span>
		<img
			className="w-32 h-20"
			src={country.flags.svg}
			alt={`${country.name} Flag`}
		/>
	</span>
)

const PlayButton = () => (
	<button className="w-40 p-4 border text-2xl">Play</button>
)

const Stats = ({ countries }: { countries: Country[] }) => {
	const guessedCounnt = countries.reduce(
		(acc, country) => acc + (country.guessed ? 1 : 0),
		0
	)
	const totalCountries = countries.length
	const guessedPercentage = ((guessedCounnt * 100) / totalCountries).toFixed()

	return (
		<div className="text-center">
			<p className="text-sm">Score</p>
			<p className="text-4xl font-bold">
				{guessedCounnt} / {totalCountries}
			</p>
			<p>{guessedPercentage}%</p>
		</div>
	)
}

const Timer = () => (
	<div className="text-center">
		<p className="text-sm">Timer</p>
		<p className="text-4xl font-bold">18:00</p>
		<button className="text-blue-500 underline text-sm">give up?</button>
	</div>
)

export default IndexPage
