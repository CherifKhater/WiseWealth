import { ImageResponse } from 'next/og'

// Image metadata
export const size = {
    width: 32,
    height: 32,
}
export const contentType = 'image/png'

// Generate the image
export default function Icon() {
    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    fontSize: 24,
                    background: 'transparent',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#3B82F6', // Electric Blue (Primary)
                }}
            >
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                >
                    <path
                        d="M3.5 18L9 6L13.5 16L19.5 4"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M20.5 4L22 20H2L3.5 18"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ opacity: 0.4 }}
                    />
                </svg>
            </div>
        ),
        // ImageResponse options
        {
            ...size,
        }
    )
}
