{
  description = "Website";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
  };

  outputs = { nixpkgs, ...}:
  let
    pkgs = nixpkgs.legacyPackages.x86_64-linux;
  in
  {
    packages.x86_64-linux.default = with pkgs; [
      hello
    ];

    devShells.x86_64-linux.default = pkgs.mkShell {
      buildInputs = with pkgs; [
        pnpm    
        nodejs_22
        astro-language-server
      ];
    };


  };
}
