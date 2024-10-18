import Head from 'next/head'
import type { FC } from 'react'
import Link from 'next/link'

type Props = {
  heading: string
  title: string
}

export const Header: FC<Props> = ({ heading, title }) => (
    <>
        <Head>
            <title>{title}</title>
        </Head>
        <h1>{heading}</h1>
    </>
)
