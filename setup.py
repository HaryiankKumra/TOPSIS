from setuptools import setup, find_packages

with open("README.md", "r", encoding="utf-8") as fh:
    long_description = fh.read()

setup(
    name="Topsis-Haryiank-102303088",
    version="1.0.2",
    author="Haryiank Kumra",
    author_email="haryiank@gmail.com",
    description="A Python package for TOPSIS (Technique for Order of Preference by Similarity to Ideal Solution) analysis",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/HaryiankKumra/TOPSIS",
    packages=find_packages(),
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    python_requires='>=3.6',
    install_requires=[
        'pandas>=1.0.0',
        'numpy>=1.18.0',
    ],
    entry_points={
        'console_scripts': [
            'topsis=topsis_haryiank_102303088.topsis:main',
        ],
    },
)
