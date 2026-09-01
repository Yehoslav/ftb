{
  description = "aMIQ este o interfață pentru jocuri de loĝică similar ĉelor televizate";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-25.11";
  };

  outputs = { self, nixpkgs }: let
    system = "x86_64-linux";
    pkgs = import nixpkgs {
        inherit system;
    };
  in {

      devShells.${system} = {
          default = import ./shell.nix {inherit pkgs;};
      };

      formatter.${system} = pkgs.alejandra;
  };
}
