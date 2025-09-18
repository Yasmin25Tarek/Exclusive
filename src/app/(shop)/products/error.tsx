"use client"
import React from 'react'

export default function error({ error }: { error: Error }) {
    return (
        <section className='bg-red-700 h-screen flex flex-col justify-center text-center'>
            <div className='container mx-auto'>
                    <h1 className='text-5xl font-bold'>Something Went Wrong!!</h1>
                    <p className='text-3xl font-semibold'>{error.message}</p>
            </div>
        </section>
    )
}
