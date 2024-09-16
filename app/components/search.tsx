"use client";

import React from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import InputAdornment from "@mui/material/InputAdornment";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const Search = ({
  placeholder,
  disabled = false,
}: {
  placeholder: string;
  disabled?: boolean;
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <TextField
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchRoundedIcon />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="clear text"
              onClick={() => handleSearch("")}
              edge="end"
            >
              <CloseRoundedIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
      fullWidth
      margin="normal"
      id="search"
      label="Search"
      name="search"
      placeholder={placeholder}
      disabled={disabled}
      defaultValue={searchParams.get("query")?.toString() || ""}
      onChange={(e) => handleSearch(e.target.value)}
    />
  );
};

export default Search;
