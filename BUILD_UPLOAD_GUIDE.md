# How to Build and Upload to PyPI

Follow these steps to build and upload your TOPSIS package to PyPI.

## Prerequisites

1. Create accounts on:
   - PyPI: https://pypi.org/account/register/
   - Test PyPI (optional but recommended): https://test.pypi.org/account/register/

2. Install required tools:
```bash
pip install twine
pip install build
```

## Step 1: Update Package Information

Before building, update these files with your information:

1. **setup.py**: Update email and GitHub URL
2. **README.md**: Update GitHub links if needed

## Step 2: Build the Package

Navigate to the package directory and build:

```bash
cd "Topsis-Haryiank-102203244"
python -m build
```

This creates two files in the `dist/` directory:
- A `.tar.gz` source distribution
- A `.whl` wheel distribution

## Step 3: Test on Test PyPI (Recommended)

Upload to Test PyPI first to verify everything works:

```bash
python -m twine upload --repository testpypi dist/*
```

Enter your Test PyPI credentials when prompted.

Test installation:
```bash
pip install -i https://test.pypi.org/simple/ Topsis-Haryiank-102303088
```

## Step 4: Upload to PyPI

Once tested, upload to the real PyPI:

```bash
python -m twine upload dist/*
```

Enter your PyPI credentials when prompted.

## Step 5: Verify Installation

Install your package from PyPI:

```bash
pip install Topsis-Haryiank-102303088
```

## Step 6: Test the Installation

Test the command-line tool:

```bash
topsis data.csv "1,1,1,1" "-,+,+,+" result.csv
```

## Updating the Package

To release a new version:

1. Update version in `setup.py` and `__init__.py`
2. Delete the old `dist/` folder
3. Rebuild: `python -m build`
4. Upload: `python -m twine upload dist/*`

## API Token (Recommended)

For security, use API tokens instead of passwords:

1. Go to PyPI Account Settings → API tokens
2. Create a token
3. Create/edit `~/.pypirc`:

```ini
[pypi]
username = __token__
password = pypi-your-api-token-here
```

## Common Issues

### "File already exists"
- You can't reupload the same version
- Increment version number and rebuild

### "Invalid distribution"
- Make sure all required files exist (README.md, LICENSE)
- Check setup.py for errors

### Import errors after installation
- Verify package name matches directory name (with underscores)
- Check __init__.py imports

## Package Structure

```
Topsis-Haryiank-102303088/
├── topsis_haryiank_102303088/
│   ├── __init__.py
│   └── topsis.py
├── setup.py
├── README.md
├── LICENSE
├── MANIFEST.in
└── data.csv (example file)
```

## Resources

- PyPI Packaging Guide: https://packaging.python.org/tutorials/packaging-projects/
- Twine Documentation: https://twine.readthedocs.io/
- Python Packaging: https://realpython.com/pypi-publish-python-package/

## Testing Locally

Before uploading, test the package locally:

```bash
pip install -e .
```

This installs the package in "editable" mode for testing.

## Quick Reference Commands

```bash
# Build package
python -m build

# Upload to Test PyPI
python -m twine upload --repository testpypi dist/*

# Upload to PyPI
python -m twine upload dist/*

# Install from Test PyPI
pip install -i https://test.pypi.org/simple/ Topsis-Haryiank-102303088

# Install from PyPI
pip install Topsis-Haryiank-102303088

# Uninstall
pip uninstall Topsis-Haryiank-102303088
```
