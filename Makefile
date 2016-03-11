ifdef ComSpec
    PATHSEP2=\\
else
    PATHSEP2=/
endif
PATHSEP=$(strip $(PATHSEP2))

test:
	.$(PATHSEP)node_modules$(PATHSEP).bin$(PATHSEP)mocha --reporter spec

 .PHONY: test
