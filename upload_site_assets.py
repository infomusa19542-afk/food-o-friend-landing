import os
import json
import mimetypes
from pathlib import Path

from dotenv import load_dotenv
from supabase import create_client


# Load environment variables from .env.local
load_dotenv(".env.local")


SUPABASE_URL = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_SECRET_KEY = os.getenv("SUPABASE_SECRET_KEY")

BUCKET_NAME = "site-assets"
LOCAL_ASSETS_DIR = Path("site-assets")
OUTPUT_FILE = Path("uploaded_urls.json")


# -----------------------------
# Validate environment
# -----------------------------

if not SUPABASE_URL:
    raise RuntimeError(
        "NEXT_PUBLIC_SUPABASE_URL is missing from .env.local"
    )

if not SUPABASE_SECRET_KEY:
    raise RuntimeError(
        "SUPABASE_SECRET_KEY is missing from .env.local"
    )

if not LOCAL_ASSETS_DIR.exists():
    raise RuntimeError(
        f"Assets folder not found: {LOCAL_ASSETS_DIR.resolve()}"
    )


# -----------------------------
# Create Supabase client
# -----------------------------

supabase = create_client(
    SUPABASE_URL,
    SUPABASE_SECRET_KEY,
)


# -----------------------------
# Allowed image extensions
# -----------------------------

ALLOWED_EXTENSIONS = {
    ".png",
    ".jpg",
    ".jpeg",
    ".webp",
    ".svg",
    ".gif",
    ".avif",
}


# -----------------------------
# Upload one file
# -----------------------------

def upload_file(local_path: Path):
    relative_path = local_path.relative_to(LOCAL_ASSETS_DIR)

    # Supabase paths always use /
    remote_path = relative_path.as_posix()

    content_type, _ = mimetypes.guess_type(str(local_path))

    if not content_type:
        content_type = "application/octet-stream"

    with open(local_path, "rb") as file:
        file_data = file.read()

    print(f"Uploading: {remote_path}")

    supabase.storage.from_(BUCKET_NAME).upload(
        path=remote_path,
        file=file_data,
        file_options={
            "content-type": content_type,
            "upsert": "true",
        },
    )

    public_url = (
        supabase.storage
        .from_(BUCKET_NAME)
        .get_public_url(remote_path)
    )

    return remote_path, public_url


# -----------------------------
# Main
# -----------------------------

def main():
    uploaded_urls = {}

    files = sorted(
        [
            path
            for path in LOCAL_ASSETS_DIR.rglob("*")
            if path.is_file()
            and path.suffix.lower() in ALLOWED_EXTENSIONS
        ]
    )

    if not files:
        print("No image files found.")
        return

    print()
    print("=" * 70)
    print("Food O Friend - Supabase Asset Upload")
    print("=" * 70)
    print(f"Local folder: {LOCAL_ASSETS_DIR.resolve()}")
    print(f"Bucket:       {BUCKET_NAME}")
    print(f"Assets found: {len(files)}")
    print("=" * 70)
    print()

    success_count = 0
    failed_count = 0

    for local_path in files:
        try:
            remote_path, public_url = upload_file(local_path)

            uploaded_urls[remote_path] = public_url

            print("SUCCESS")
            print(f"Path: {remote_path}")
            print(f"URL:  {public_url}")
            print("-" * 70)

            success_count += 1

        except Exception as error:
            print("FAILED")
            print(f"File: {local_path}")
            print(f"Error: {error}")
            print("-" * 70)

            failed_count += 1

    # Save all URLs to JSON
    with open(OUTPUT_FILE, "w", encoding="utf-8") as file:
        json.dump(
            uploaded_urls,
            file,
            indent=2,
            ensure_ascii=False,
        )

    print()
    print("=" * 70)
    print("UPLOAD COMPLETE")
    print("=" * 70)
    print(f"Successful: {success_count}")
    print(f"Failed:     {failed_count}")
    print(f"Total:      {len(files)}")
    print()
    print(f"URLs saved to:")
    print(OUTPUT_FILE.resolve())
    print("=" * 70)


if __name__ == "__main__":
    main()