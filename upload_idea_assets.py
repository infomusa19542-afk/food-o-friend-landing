import os
import json
import mimetypes
from pathlib import Path
from urllib.parse import quote

import requests
from dotenv import load_dotenv


load_dotenv(".env.local")


SUPABASE_URL = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_SECRET_KEY = os.getenv("SUPABASE_SECRET_KEY")

BUCKET_NAME = "idea-assets"
LOCAL_ASSETS_DIR = Path("site-assets/idea")
OUTPUT_FILE = Path("idea_uploaded_urls.json")

ALLOWED_EXTENSIONS = {
    ".png",
    ".jpg",
    ".jpeg",
    ".webp",
    ".svg",
    ".gif",
    ".avif",
}


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


SUPABASE_URL = SUPABASE_URL.rstrip("/")

STORAGE_URL = f"{SUPABASE_URL}/storage/v1"


HEADERS = {
    "apikey": SUPABASE_SECRET_KEY,
    "Authorization": f"Bearer {SUPABASE_SECRET_KEY}",
}


session = requests.Session()
session.headers.update(HEADERS)


def ensure_bucket_exists():
    print()
    print("Checking Supabase bucket...")

    response = session.get(
        f"{STORAGE_URL}/bucket",
        timeout=30,
    )

    if not response.ok:
        raise RuntimeError(
            f"Could not list buckets: "
            f"{response.status_code} {response.text}"
        )

    buckets = response.json()

    existing_names = {
        bucket.get("name")
        for bucket in buckets
        if isinstance(bucket, dict)
    }

    if BUCKET_NAME in existing_names:
        print(f"Bucket already exists: {BUCKET_NAME}")
        return

    print(
        f"Bucket does not exist. Creating: {BUCKET_NAME}"
    )

    payload = {
        "id": BUCKET_NAME,
        "name": BUCKET_NAME,
        "public": True,
        "file_size_limit": 20 * 1024 * 1024,
        "allowed_mime_types": [
            "image/png",
            "image/jpeg",
            "image/webp",
            "image/svg+xml",
            "image/gif",
            "image/avif",
        ],
    }

    response = session.post(
        f"{STORAGE_URL}/bucket",
        json=payload,
        timeout=30,
    )

    if response.status_code not in (200, 201):
        raise RuntimeError(
            f"Bucket creation failed: "
            f"{response.status_code} {response.text}"
        )

    print(
        f"Bucket created successfully: {BUCKET_NAME}"
    )


def upload_file(local_path: Path):
    relative_path = local_path.relative_to(
        LOCAL_ASSETS_DIR
    )

    remote_path = relative_path.as_posix()

    encoded_remote_path = quote(
        remote_path,
        safe="/",
    )

    content_type, _ = mimetypes.guess_type(
        str(local_path)
    )

    if not content_type:
        content_type = "application/octet-stream"

    upload_url = (
        f"{STORAGE_URL}/object/"
        f"{BUCKET_NAME}/"
        f"{encoded_remote_path}"
    )

    with open(local_path, "rb") as file:
        file_data = file.read()

    response = session.post(
        upload_url,
        data=file_data,
        headers={
            "Content-Type": content_type,
            "x-upsert": "true",
        },
        timeout=120,
    )

    if response.status_code not in (
        200,
        201,
    ):
        raise RuntimeError(
            f"Upload failed: "
            f"{response.status_code} "
            f"{response.text}"
        )

    public_url = (
        f"{STORAGE_URL}/object/public/"
        f"{BUCKET_NAME}/"
        f"{encoded_remote_path}"
    )

    return remote_path, public_url


def main():
    print()
    print("=" * 72)
    print("Food O Friend - Idea Assets Upload")
    print("=" * 72)
    print(
        f"Local folder: "
        f"{LOCAL_ASSETS_DIR.resolve()}"
    )
    print(f"Bucket:       {BUCKET_NAME}")
    print("=" * 72)

    ensure_bucket_exists()

    files = sorted(
        path
        for path in LOCAL_ASSETS_DIR.rglob("*")
        if (
            path.is_file()
            and path.suffix.lower()
            in ALLOWED_EXTENSIONS
        )
    )

    if not files:
        print("No image files found.")
        return

    print()
    print(f"Assets found: {len(files)}")
    print("=" * 72)
    print()

    uploaded_urls = {}

    success_count = 0
    failed_count = 0

    for index, local_path in enumerate(
        files,
        start=1,
    ):
        print(
            f"[{index}/{len(files)}] "
            f"{local_path}"
        )

        try:
            remote_path, public_url = (
                upload_file(local_path)
            )

            uploaded_urls[
                remote_path
            ] = public_url

            success_count += 1

            print("SUCCESS")
            print(f"Path: {remote_path}")
            print(f"URL:  {public_url}")

        except KeyboardInterrupt:
            print()
            print("Upload cancelled.")
            break

        except Exception as error:
            failed_count += 1

            print("FAILED")
            print(f"Error: {error}")

        print("-" * 72)

    with open(
        OUTPUT_FILE,
        "w",
        encoding="utf-8",
    ) as file:
        json.dump(
            uploaded_urls,
            file,
            indent=2,
            ensure_ascii=False,
        )

    print()
    print("=" * 72)
    print("UPLOAD COMPLETE")
    print("=" * 72)
    print(
        f"Successful: {success_count}"
    )
    print(
        f"Failed:     {failed_count}"
    )
    print(
        f"Total:      {len(files)}"
    )
    print()
    print(
        f"URLs saved to: "
        f"{OUTPUT_FILE.resolve()}"
    )
    print("=" * 72)


if __name__ == "__main__":
    main()