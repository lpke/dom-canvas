{
  description = "canva-aip local dev shell";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-26.05";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { nixpkgs, flake-utils, ... }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
        };
      in
      {
        devShells.default = pkgs.mkShell {
          packages = [
            pkgs.nodejs_24
            (pkgs.pnpm.override { nodejs = pkgs.nodejs_24; })
          ];

          shellHook = ''
            export PATH="$PWD/.flake.local/bin:$PATH"
          '';
        };
      });
}
