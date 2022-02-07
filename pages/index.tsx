import countriesData from "data/countries.json"
import { Country } from "interfaces"
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import Layout from "components/Layout"

const IndexPage = () => {
    const [query, setQuery] = useState<string>("")
    const [countries, setCountries] = useState<Country[]>(
        countriesData.map(country => ({ ...country, guessed: false }))
    )
    const [guessedCountries, setGuessedCountries] = useState<Country[]>([])
    const [countriesLeft, setcountriesLeft] = useState<Country[]>(countriesData)
    const [currentIndex, setCurrentIndex] = useState<number>(0)

    const currentCountry = countriesLeft[currentIndex]

    const inputRef = useRef(null)

    useEffect(() => {
        if (query.toLowerCase() === currentCountry.name.toLowerCase()) {
            setQuery("")

            if (currentIndex === countriesLeft.length - 1)
                setCurrentIndex(index => (countriesLeft.length - 1) % index)

            setCountries(countries =>
                countries.map(country =>
                    country.name === currentCountry.name
                        ? { ...country, guessed: true }
                        : country
                )
            )

            setGuessedCountries(countries => [currentCountry, ...countries])
            setcountriesLeft(countries =>
                countries.filter(
                    country => country.name !== currentCountry.name
                )
            )
        }
    }, [query])

    const onPrevPressed = () =>
        setCurrentIndex(
            index => (index - 1 + countriesLeft.length) % countriesLeft.length
        )

    const onNextPressed = () =>
        setCurrentIndex(index => (index + 1) % countriesLeft.length)

    const onFlagClicked = (country: Country) => {
        if (!country.guessed) {
            setCurrentIndex(
                countriesLeft.findIndex(c => c.name === country.name)
            )
            inputRef.current.focus()
        }
    }

    return (
        <Layout title="Flag Quiz">
            <header className="flex w-3/5 mx-auto space-x-4 items-center justify-between py-10">
                <div className="flex space-x-10">
                    <CurrentCountryFlag country={currentCountry} />

                    <div className="text-sm w-60 space-y-2">
                        <p className="text-lg">Enter Country:</p>
                        <input
                            type="text"
                            className="border px-4 py-2 w-full bg-black border border-white rounded"
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
                </div>
            </header>

            <main className="flex space-x-4">
                <div className="w-3/5">
                    <h2 className="text-xl text-center">
                        All Countries ({countries.length})
                    </h2>
                    <div className="flex flex-wrap">
                        {countries.map(country => (
                            <Flag
                                country={country}
                                onClick={onFlagClicked}
                                key={country.name}
                            />
                        ))}
                    </div>
                </div>
                <div className="w-2/5 h-96">
                    <h2 className="text-xl text-center">
                        Guessed Countries (
                        {countries.length - countriesLeft.length})
                    </h2>
                    <div className="h-full overflow-auto">
                        {guessedCountries.map(c => (
                            <div key={c.name} className="flex">
                                <span className="w-6 text-xl align-middle">
                                    {c.flag}
                                </span>
                                {c.name}
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </Layout>
    )
}

type FlagProps = {
    country: Country
    onClick: Dispatch<SetStateAction<Country>>
}

const Flag = ({ country, onClick }: FlagProps) => {
    const { guessed, flag } = country
    const opacity = guessed ? "opacity-100" : "opacity-40"
    return (
        <button
            className="w-10 flex flex-col items-center cursor-pointer"
            onClick={() => onClick(country)}
        >
            <span className={`text-4xl ${opacity}`}>{flag}</span>
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

const Stats = ({ countries }: { countries: Country[] }) => {
    const guessedCount = countries.reduce(
        (acc, country) => acc + (country.guessed ? 1 : 0),
        0
    )
    const totalCountries = countries.length
    const guessedPercentage = ((guessedCount * 100) / totalCountries).toFixed()

    return (
        <div className="text-center">
            <p className="text-sm">Score</p>
            <p className="text-4xl font-bold">
                {guessedCount} / {totalCountries}
            </p>
            <p>{guessedPercentage}%</p>
        </div>
    )
}

export default IndexPage
